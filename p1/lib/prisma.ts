/**
 * Prisma client stub - replace with real Prisma when database is configured
 * For now returns mock/empty data so the app runs without a database
 */
const mockFindMany = async () => []
const mockFindUnique = async () => null
const mockCreate = async (args: { data: Record<string, unknown> }) => ({
  id: 'mock-' + Date.now(),
  ...args.data,
})
const mockUpdate = async (args: { where: Record<string, unknown>; data: Record<string, unknown> }) => ({
  id: (args.where as { id: string }).id,
  ...args.data,
})

export const prisma = {
  event: {
    findMany: mockFindMany,
    create: mockCreate,
    findUnique: mockFindUnique,
  },
  decision: {
    findMany: mockFindMany,
    create: mockCreate,
  },
  discussion: {
    create: mockCreate,
    findMany: mockFindMany,
    update: mockUpdate,
  },
} as any
