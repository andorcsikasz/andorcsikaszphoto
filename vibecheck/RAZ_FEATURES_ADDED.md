# Features Ported from RAZ fullstack-web-template

Useful patterns and components from `RAZ fullstack-web-template-master` have been integrated into vibecheck.

## Utilities

| File | Description |
|------|-------------|
| `lib/utils.ts` | `cn()` – merge Tailwind classes with clsx |
| `lib/errors.ts` | `AppError`, `ErrorCode`, `Errors` factory, `getErrorMessage()` |
| `lib/constants.ts` | `COOKIE_NAME`, `API_TIMEOUT_MS`, `DEFAULT_PAGE_SIZE` |
| `lib/date-utils.ts` | `format`, `formatDate`, `formatDateTime`, `formatRelative` from date-fns |

## Components

| File | Description |
|------|-------------|
| `components/ErrorBoundary.tsx` | Catches React errors, shows fallback with retry / reload / home |
| `components/ui/button.tsx` | Button with variants (default, outline, ghost, etc.) and sizes |
| `components/ui/card.tsx` | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| `components/ui/input.tsx` | Styled input using vibecheck theme |
| `components/ui/textarea.tsx` | Styled textarea |
| `components/ui/skeleton.tsx` | Skeleton placeholder |
| `components/AIChatBox.tsx` | AI chat UI with messages, suggested prompts, loading state |

## API Routes

| Route | Description |
|-------|-------------|
| `GET /api/health` | Health check for Railway / container orchestration |
| `POST /api/ai/chat` | Generic AI chat (requires `OPENAI_API_KEY`) |

## Usage Examples

### cn()
```tsx
import { cn } from '@/lib/utils'
<div className={cn('base', condition && 'optional', className)} />
```

### AppError
```ts
import { Errors, getErrorMessage } from '@/lib/errors'
throw Errors.notFound('Event', id)
const msg = getErrorMessage(err)
```

### ErrorBoundary
Wraps the app in `layout.tsx`. Catches runtime React errors and shows a fallback.

### AIChatBox
```tsx
import { AIChatBox, type Message } from '@/components/AIChatBox'

const [messages, setMessages] = useState<Message[]>([])
const handleSend = async (content) => {
  const res = await fetch('/api/ai/chat', { method: 'POST', body: JSON.stringify({ messages: [...messages, { role: 'user', content }] }) })
  const { content: reply } = await res.json()
  setMessages(prev => [...prev, { role: 'assistant', content: reply }])
}

<AIChatBox messages={messages} onSendMessage={handleSend} isLoading={loading} />
```

### Demo
Visit `/demo/ai` for an AI chat demo.

## Dependencies Added

- `clsx` – conditional classnames
- `tailwind-merge` – merge Tailwind without conflicts
- `class-variance-authority` – variant props for components
- `date-fns` – date formatting
