import { promises as fs } from "fs";

export async function logStatusToFile(
  filePath: string,
  statusMessage: string,
): Promise<void> {
  const timestamp = new Date().toISOString();
  const logEntry = `${statusMessage} - ${timestamp}\n`;

  await fs.appendFile(filePath, logEntry, "utf-8");
}
