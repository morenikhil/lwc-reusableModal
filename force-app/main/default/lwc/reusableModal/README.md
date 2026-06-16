# Reusable Modal / Dialog — Salesforce LWC

A fully configurable, accessible modal dialog component for Salesforce Lightning Web Components. Supports named slots for header, body, and footer; four size variants; ESC-key dismissal; and optional close-on-overlay-click behaviour.

---

## Component Structure

```
force-app/main/default/lwc/
├── reusableModal/
│   ├── reusableModal.html          # Template with named slots
│   ├── reusableModal.js            # Controller (public API + event handling)
│   ├── reusableModal.css           # Size variants + entry animation
│   └── reusableModal.js-meta.xml  # Metadata (isExposed: false — library component)
│
└── reusableModalDemo/
    ├── reusableModalDemo.html      # Usage examples for all variants
    ├── reusableModalDemo.js        # Demo controller
    └── reusableModalDemo.js-meta.xml
```

---

## Public API

### Properties (`@api`)

| Property | Type | Default | Description |
|---|---|---|---|
| `isOpen` | `Boolean` | `false` | Controls modal visibility. Set to `true` to open, `false` to close. |
| `title` | `String` | `''` | Text rendered in the default header slot when no `header` slot is provided. |
| `size` | `String` | `'medium'` | Size variant: `small` \| `medium` \| `large` \| `full` |
| `cancelLabel` | `String` | `'Cancel'` | Label for the default Cancel button. |
| `confirmLabel` | `String` | `'OK'` | Label for the default Confirm button. |
| `closeOnOverlayClick` | `Boolean` | `false` | When `true`, clicking the backdrop closes the modal. |
| `hideDefaultFooter` | `Boolean` | `false` | When `true`, the entire footer section (including the slot) is hidden. |

### Events

| Event | When fired | `event.detail` |
|---|---|---|
| `close` | X button clicked, ESC key pressed, or backdrop clicked (when `closeOnOverlayClick` is `true`) | — |
| `confirm` | Default Confirm button clicked | — |

### Slots

| Slot name | Fallback | Description |
|---|---|---|
| `header` | Value of `title` prop | Custom header content |
| `body` | *(empty)* | Main modal content |
| `footer` | Cancel + Confirm buttons | Custom action buttons |

---

## Size Variants

| Value | Approximate width |
|---|---|
| `small` | ~400 px |
| `medium` *(default)* | SLDS default (~50 vw) |
| `large` | ~90 vw |
| `full` | 100 vw × 100 vh |

---

## Usage

### Minimal — title prop + default footer

```html
<!-- parent.html -->
<c-reusable-modal
    is-open={isModalOpen}
    title="Confirm Delete"
    confirm-label="Delete"
    cancel-label="Cancel"
    onclose={closeModal}
    onconfirm={handleDelete}
>
    <span slot="body">
        Are you sure you want to delete this record? This action cannot be undone.
    </span>
</c-reusable-modal>
```

```js
// parent.js
isModalOpen = false;

openModal() { this.isModalOpen = true; }
closeModal() { this.isModalOpen = false; }
handleDelete() {
    this.isModalOpen = false;
    // perform delete logic
}
```

---

### Large modal — close on overlay click

```html
<c-reusable-modal
    is-open={isOpen}
    title="Edit Record"
    size="large"
    close-on-overlay-click
    onclose={handleClose}
    onconfirm={handleSave}
>
    <span slot="body">
        <lightning-record-edit-form record-id={recordId} object-api-name="Account">
            <lightning-input-field field-name="Name"></lightning-input-field>
            <lightning-input-field field-name="Phone"></lightning-input-field>
        </lightning-record-edit-form>
    </span>
</c-reusable-modal>
```

---

### All three slots — custom header, body, footer

```html
<c-reusable-modal
    is-open={isOpen}
    size="medium"
    onclose={handleClose}
>
    <span slot="header">
        <lightning-icon icon-name="utility:warning" size="small"></lightning-icon>
        Warning
    </span>

    <span slot="body">
        <p>You have unsaved changes. What would you like to do?</p>
    </span>

    <span slot="footer">
        <lightning-button label="Keep Editing" variant="neutral" onclick={handleClose}></lightning-button>
        <lightning-button label="Discard Changes" variant="destructive" class="slds-m-left_x-small" onclick={handleDiscard}></lightning-button>
        <lightning-button label="Save" variant="brand" class="slds-m-left_x-small" onclick={handleSave}></lightning-button>
    </span>
</c-reusable-modal>
```

---

### Full-screen modal — hide footer

```html
<c-reusable-modal
    is-open={isOpen}
    title="Full Screen View"
    size="full"
    hide-default-footer
    onclose={handleClose}
>
    <span slot="body">
        <!-- rich content, charts, data tables, etc. -->
    </span>
</c-reusable-modal>
```

---

## Accessibility

- `role="dialog"` and `aria-modal="true"` on the modal container.
- `aria-labelledby` linked to the heading element.
- `aria-describedby` linked to the body element.
- **ESC key** dismissal bound at the `document` level when open; listener removed on close and `disconnectedCallback`.
- Close button exposes `alternative-text` and `title` attributes.
- SLDS focus management classes applied via standard `slds-fade-in-open` and `slds-backdrop_open`.

---

## Deployment

```bash
# Deploy both components
sf project deploy start --source-dir force-app/main/default/lwc/reusableModal
sf project deploy start --source-dir force-app/main/default/lwc/reusableModalDemo

# Or deploy the entire force-app tree
sf project deploy start --source-dir force-app
```

Add `reusableModalDemo` to a Lightning App, Record, or Home page via **Setup → Lightning App Builder** to see all variants in action.

---

## Salesforce Best Practices Applied

| Practice | Implementation |
|---|---|
| `isExposed: false` for library components | `reusableModal` is not exposed to App Builder — only consumed by other LWCs |
| No direct DOM manipulation | All state driven via reactive properties and `if:true` |
| Custom events bubble disabled | Events are component-scoped (`bubbles: false` default) |
| `disconnectedCallback` cleanup | ESC keyboard listener is always removed on component teardown |
| SLDS-only styling | No custom colour values; size overrides use `max-width` only |
| `@api` setter validation | `size` setter guards against invalid values |
| Slot-first design | All regions are overridable without forking the component |
