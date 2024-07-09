import React from 'react'
import '../css/CustomSpinner.css'
export default function LoadingSpinner() {
    return (
        <div class="d-flex justify-content-center">
            <div class="spinner-border custom-spinner" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
