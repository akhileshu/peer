Use **internal** (double underscores) to clearly signal private/internal code.

- primarily used only once inside a wrapper , place it near to the wrapper where its used

- ex : import { FieldErrors } from "@/lib/server-actions/**internal**/types";
- general rule of thumb : using / importing / modifying internal code is to be done carefully , not to be used/modified frequently - if done so its should not belong to internal code - writing jsdoc for internal code is recommended ,

---

### ✅ **Internal Code Convention**

**Folder name:** `__internal__`
**Purpose:** Mark helpers/types/utils that are:

- tightly coupled to a single module
- used **only inside one feature/wrapper**
- **not intended** for public/shared use

---

### 📁 Example Structure:

```
lib/
├── server-actions/
│   ├── index.ts
│   ├── action1.ts
│   └── __internal__/
│       ├── helpers.ts       // private to server-actions
│       └── types.ts
```

---

### 📌 Guidelines

- 🔒 Keep **internal helpers/types/hooks** close to where they're used.
- 📄 Use JSDoc (`/** */`) to explain internal functions clearly.
- 🚫 Avoid importing from `__internal__` elsewhere. If you **need to**, reconsider moving that code out.

---

### 🧠 Rule of Thumb

> _If internal code is being reused or modified often, it's **not** internal anymore — move it to a shared or public module._

---

Let me know if you want an ESLint rule to enforce internal import boundaries too.
