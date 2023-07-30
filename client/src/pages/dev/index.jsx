import React from "react";
//dev page to view components

export default function Dev () {
    return(
        <>
            <h1>Dev Page</h1>
            <div className="p-3 bg-gray-700">
                <button className="btn">Button</button>
                <button className="btn btn-primary">Primary</button>
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
                <button className="btn btn-disabled">Disabled</button>
            </div>
        </>
    )
}