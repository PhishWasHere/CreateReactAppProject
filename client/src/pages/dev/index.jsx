import React from "react";

export default function Dev () {
    return(
        <>
            <h1>Dev Page</h1>
            <div className="p-3 bg-gray-700">
                <button className="btn btn-">Primary</button>
                <button className="btn btn-secondary">Secondary</button>
                <button className="btn btn-accent">Accent</button>
                <button className="btn btn-neutral">Neutral</button>
                <button className="btn btn-success">Success</button>
                <button className="btn btn-warning">Warning</button>
                <button className="btn btn-error">Error</button>
                <button className="btn btn-info">Info</button>
                <button className="btn btn-outline">Outline</button>
                <button className="btn btn-ghost">Ghost</button>
                <button className="btn btn-link">Link</button>
                <button className="btn btn-disabled" disabled>Disabled</button>
            </div>
        </>
    )
}