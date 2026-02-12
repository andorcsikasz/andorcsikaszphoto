/**
 * Prisma client stub - replace with real Prisma when database is configured
 * For now returns mock/empty data so the app runs without a database
 */
const mockFindMany = async () => []
const mockFindUnique = async () => null
const mockCreate = async (args: { data: Record<string, unknown>; include?: unknown }) => {
  const id = 'mock-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7)
  const base = { id, ...args.data }
  if (args.include && typeof args.include === 'object') {
    const inc = args.include as Record<string, unknown>
    if (inc.options) base.options = []
    if (inc.votes) base.votes = []
    if (inc.user) base.user = { id, name: (args.data as Record<string, unknown>).name ?? 'User', avatar: null }
    if (inc.option) base.option = null
  }
  return base
}
const mockUpdate = async (args: { where: Record<string, unknown>; data: Record<string, unknown>; include?: unknown }) => {
  const id = (args.where as { id?: string; userId_decisionId?: { userId: string; decisionId: string } }).id
    ?? (args.where as { userId_decisionId?: { userId: string; decisionId: string } }).userId_decisionId?.decisionId
  const base = { id, ...args.data }
  if (args.include && typeof args.include === 'object') {
    const inc = args.include as Record<string, unknown>
    if (inc.option) base.option = null
    if (inc.user) base.user = { id, name: 'User', avatar: null }
  }
  return base
}

export const prisma = {
  event: {
    findMany: mockFindMany,
    create: mockCreate,
    findUnique: mockFindUnique,
  },
  decision: {
    findMany: mockFindMany,
    findUnique: mockFindUnique,
    create: mockCreate,
  },
  vote: {
    findUnique: mockFindUnique,
    create: mockCreate,
    update: mockUpdate,
  },
  user: {
    findUnique: mockFindUnique,
    create: mockCreate,
  },
  discussion: {
    create: mockCreate,
    findMany: mockFindMany,
    update: mockUpdate,
  },
} as any
