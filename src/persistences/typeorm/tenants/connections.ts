import { DataSource, type DataSourceOptions } from "typeorm"
import { entityManager } from "@/persistences/typeorm"
import { SystemLogger } from "@/common/libs/log4js"

// Map to store client connections
const clientConnections = new Map<string, DataSource>()

async function createSchema(
  dataSource: DataSource,
  schemaName: string
): Promise<void> {
  await dataSource.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`)
}

export async function getClientConnection(
  clientId: string
): Promise<DataSource> {
  const connectionName = `client_${clientId}`

  // Check if a connection for this client already exists
  if (clientConnections.has(connectionName)) {
    const existingConnection = clientConnections.get(connectionName)

    if (existingConnection) {
      if (!existingConnection.isInitialized) {
        await existingConnection.initialize()
      }

      return existingConnection
    } else {
      throw new Error(`Connection not found for client ${clientId}`)
    }
  }

  const dataSourceOptions: DataSourceOptions = {
    ...entityManager.options,
    type: "postgres",
    schema: connectionName,
    name: connectionName,
  }

  // Create a new instance of DataSource
  const newDataSource = new DataSource(dataSourceOptions)

  try {
    // Initialize the new connection
    await createSchema(entityManager, connectionName)
    await newDataSource.initialize()

    // Store the new connection in the map
    clientConnections.set(connectionName, newDataSource)

    SystemLogger.info(`Connected to database for client ${clientId}`)
    return newDataSource
  } catch (error) {
    SystemLogger.error(
      `Error initializing connection for client ${clientId}:`,
      error
    )
    throw error
  }
}

// Function to close all client connections
export async function closeAllClientConnections(): Promise<void> {
  for (const [connectionName, dataSource] of clientConnections.entries()) {
    if (dataSource.isInitialized) {
      await dataSource.destroy()
      SystemLogger.info(`Connection ${connectionName} closed.`)
    }
  }
  clientConnections.clear()
}
