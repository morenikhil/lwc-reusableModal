import { LightningElement, track } from 'lwc';

export default class ReusableModalDemo extends LightningElement {
    @track isOpen = false;
    @track isCustomOpen = false;
    @track activeSize = 'medium';
    @track isOverlayClose = false;
    @track lastAction = '';

    get activeTitle() {
        return `${this.activeSize.charAt(0).toUpperCase() + this.activeSize.slice(1)} Modal`;
    }

    handleOpenModal(event) {
        const { size, overlay, custom } = event.currentTarget.dataset;
        this.activeSize = size || 'medium';
        this.isOverlayClose = overlay === 'true';

        if (custom === 'true') {
            this.isCustomOpen = true;
        } else {
            this.isOpen = true;
        }
        this.lastAction = '';
    }

    handleClose() {
        this.isOpen = false;
        this.lastAction = 'Modal closed (dismissed)';
    }

    handleCustomClose() {
        this.isCustomOpen = false;
        this.lastAction = 'Custom modal closed';
    }

    handleConfirm() {
        this.isOpen = false;
        this.lastAction = 'Confirmed! Action committed.';
    }
}
