# Custom Hooks

Reusable React hooks for common patterns across the application.

## Available Hooks

### State Management

#### `useModal(initialOpen?)`
Manages modal/dialog open/close state with convenient helper functions.

```tsx
const { open, openModal, closeModal, toggleModal } = useModal();

<Button onClick={openModal}>Open</Button>
<Dialog open={open} onOpenChange={setOpen}>...</Dialog>
```

#### `useModalWithData<T>(initialOpen?, initialData?)`
Extended modal hook that also manages data associated with the modal.

```tsx
const { open, data, openModal, closeModal } = useModalWithData<Contact>();

<Button onClick={() => openModal(contact)}>Edit</Button>
<EditModal open={open} contact={data} />
```

#### `useLocalStorage<T>(key, initialValue)`
Syncs state with localStorage for persistent data across sessions.

```tsx
const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');
```

#### `useSessionStorage<T>(key, initialValue)`
Similar to useLocalStorage but uses sessionStorage (session-only persistence).

```tsx
const [formDraft, setFormDraft] = useSessionStorage('draft', {});
```

---

### Table & List Management

#### `useTableSort<T>(data, initialField, initialDirection?)`
Manages table sorting state and provides sorted data.

```tsx
const { sortedData, sortField, handleSort, getSortIcon } =
  useTableSort(contacts, 'name', 'asc');

<TableHeader onClick={() => handleSort('name')}>
  Name {getSortIcon('name')}
</TableHeader>
```

**Features:**
- Automatic type-aware sorting (strings, numbers, dates)
- Click to toggle direction (asc/desc)
- Icon helper for sort indicators
- Memoized for performance

#### `useTableFilter<T>(data, filterFn?, initialQuery?)`
Manages table filtering with search query and custom filter logic.

```tsx
const { filteredData, query, setQuery, clearFilter, hasNoResults } =
  useTableFilter(contacts, (contact, query) =>
    contact.name.toLowerCase().includes(query.toLowerCase())
  );

<Input value={query} onChange={(e) => setQuery(e.target.value)} />
{hasNoResults && <p>No results found</p>}
```

#### `useMultiFieldFilter<T>(data, fields, initialQuery?)`
Convenient wrapper for filtering across multiple fields.

```tsx
const { filteredData, query, setQuery } = useMultiFieldFilter(
  contacts,
  ['name', 'email', 'phone', 'company']
);
```

---

### Performance

#### `useDebounce<T>(value, delay?)`
Delays updating a value until after a specified delay (default: 500ms).

```tsx
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 500);

useEffect(() => {
  if (debouncedSearch) {
    fetchResults(debouncedSearch);
  }
}, [debouncedSearch]);
```

#### `useDebouncedCallback<T>(callback, delay?)`
Returns a debounced version of a callback function.

```tsx
const debouncedSave = useDebouncedCallback((data) => {
  saveToAPI(data);
}, 1000);

<Form onChange={(data) => debouncedSave(data)} />
```

---

### Existing Hooks

#### `useAdBuilder()`
Manages ad builder state and workflow.

#### `useToast()`
Toast notification management (shadcn/ui).

#### `useIsMobile()`
Detects mobile viewport size.

---

## Usage Patterns

### Combining Hooks

Hooks can be easily combined for complex functionality:

```tsx
function ContactsTable() {
  // Filter contacts by search query
  const { filteredData, query, setQuery } = useMultiFieldFilter(
    contacts,
    ['name', 'email', 'phone']
  );

  // Sort filtered contacts
  const { sortedData, handleSort, getSortIcon } = useTableSort(
    filteredData,
    'lastContact',
    'desc'
  );

  // Debounce search input
  const debouncedQuery = useDebounce(query, 300);

  // Edit modal
  const { open, data, openModal, closeModal } = useModalWithData<Contact>();

  return (
    <>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <Table>
        <TableHeader onClick={() => handleSort('name')}>
          Name {getSortIcon('name')}
        </TableHeader>
        {sortedData.map(contact => (
          <TableRow onClick={() => openModal(contact)}>
            {contact.name}
          </TableRow>
        ))}
      </Table>
      <EditContactModal
        open={open}
        contact={data}
        onClose={closeModal}
      />
    </>
  );
}
```

---

## Best Practices

1. **Import from index**: Always import hooks from `@/hooks` for consistency
   ```tsx
   import { useModal, useTableSort } from '@/hooks';
   ```

2. **Memoization**: Hooks already use `useMemo` and `useCallback` internally where appropriate

3. **TypeScript**: Use generic types for type safety
   ```tsx
   const { data, openModal } = useModalWithData<User>();
   ```

4. **Naming**: Use descriptive variable names when destructuring
   ```tsx
   const { open: isEditModalOpen, openModal: openEditModal } = useModal();
   ```

---

## Creating New Hooks

When creating new hooks:

1. Add to `/src/hooks/` directory
2. Include JSDoc comments with examples
3. Export from `/src/hooks/index.ts`
4. Update this README
5. Add TypeScript types
6. Consider memoization for expensive operations

---

## Migration Guide

### Before (Repetitive Code)

```tsx
const [open, setOpen] = useState(false);
const handleClose = () => setOpen(false);
const handleOpen = () => setOpen(true);

<Dialog open={open} onOpenChange={setOpen}>...</Dialog>
```

### After (Using Hook)

```tsx
const { open, openModal, closeModal } = useModal();

<Dialog open={open} onOpenChange={closeModal}>...</Dialog>
```

**Result**: 3 lines → 1 line, plus helpful utilities!

---

## Performance Notes

- All hooks use React's built-in optimization (useMemo, useCallback)
- Table sorting is memoized and only recalculates when data/sort changes
- Debounce hooks prevent unnecessary re-renders
- LocalStorage hooks sync across tabs/windows automatically
