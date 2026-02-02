/**
 * Compatibility layer for Zotero 7 and 8
 * Handles differences in WebDAV password API between versions
 */

/**
 * Get WebDAV password with compatibility for both Zotero 7 and 8
 * Zotero 7: Uses synchronous property controller.password
 * Zotero 8: Uses async method controller.getPassword()
 */
export async function getWebdavPassword(): Promise<string> {
  const controller = Zotero.Sync.Runner.getStorageController('webdav')

  // Check if Zotero 8 (has getPassword method)
  if (typeof controller.getPassword === 'function') {
    return await controller.getPassword()
  }

  // Zotero 7 (password property)
  return (controller as any).password
}

/**
 * Set WebDAV password with compatibility for both Zotero 7 and 8
 * Zotero 7: Uses synchronous property controller.password = value
 * Zotero 8: Uses async method controller.setPassword(value)
 */
export async function setWebdavPassword(password: string): Promise<void> {
  const controller = Zotero.Sync.Runner.getStorageController('webdav')

  // Check if Zotero 8 (has setPassword method)
  if (typeof controller.setPassword === 'function') {
    await controller.setPassword(password)
  }
  else {
    // Zotero 7 (password property)
    (controller as any).password = password
  }
}
