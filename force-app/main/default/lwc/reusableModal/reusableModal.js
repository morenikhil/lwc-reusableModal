import { LightningElement, api } from 'lwc';

const VALID_SIZES = new Set(['small', 'medium', 'large', 'full']);
const DEFAULT_SIZE = 'medium';

/**
 * Reusable Modal / Dialog component.
 *
 * Slots:
 *  - header  : Custom header content (falls back to `title` prop)
 *  - body    : Main modal content
 *  - footer  : Custom footer (falls back to Cancel/Confirm buttons)
 *
 * Events fired:
 *  - close   : User dismissed the modal (X button, ESC, or overlay click when enabled)
 *  - confirm : User clicked the default Confirm button
 */
export default class ReusableModal extends LightningElement {
    /** Text shown in the default header slot. */
    @api title = '';

    /** Label for the default Cancel button. */
    @api cancelLabel = 'Cancel';

    /** Label for the default Confirm button. */
    @api confirmLabel = 'OK';

    /** When true, clicking the backdrop closes the modal. */
    @api closeOnOverlayClick = false;

    /** When true, the entire footer section is hidden. */
    @api hideDefaultFooter = false;

    // ─── Private backing fields ──────────────────────────────────────────────

    _isOpen = false;
    _size = DEFAULT_SIZE;

    // ─── Public API ──────────────────────────────────────────────────────────

    @api
    get isOpen() {
        return this._isOpen;
    }
    set isOpen(value) {
        this._isOpen = Boolean(value);
        if (this._isOpen) {
            this._bindKeyboard();
        } else {
            this._unbindKeyboard();
        }
    }

    /** Size variant: 'small' | 'medium' (default) | 'large' | 'full' */
    @api
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = VALID_SIZES.has(value) ? value : DEFAULT_SIZE;
    }

    // ─── Template getters ────────────────────────────────────────────────────

    get isVisible() {
        return this._isOpen;
    }

    get computedModalClass() {
        const base = 'slds-modal slds-fade-in-open';
        return this._size !== 'medium' ? `${base} slds-modal_${this._size}` : base;
    }

    // ─── Event handlers ──────────────────────────────────────────────────────

    handleBackdropClick() {
        if (this.closeOnOverlayClick) {
            this._dispatchClose();
        }
    }

    handleClose() {
        this._dispatchClose();
    }

    handleConfirm() {
        this.dispatchEvent(new CustomEvent('confirm'));
    }

    // ─── Lifecycle ───────────────────────────────────────────────────────────

    disconnectedCallback() {
        this._unbindKeyboard();
    }

    // ─── Private helpers ─────────────────────────────────────────────────────

    _dispatchClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    // Arrow function preserves `this` for add/remove symmetry
    _onKeyDown = (event) => {
        if (event.key === 'Escape') {
            event.stopPropagation();
            this._dispatchClose();
        }
    };

    _bindKeyboard() {
        document.addEventListener('keydown', this._onKeyDown);
    }

    _unbindKeyboard() {
        document.removeEventListener('keydown', this._onKeyDown);
    }
}
