import React, { useState } from "react";
export default function SearchBar({ search, setSearch }) {

    return (
        <div className="row mb-4">
            <div className="col-md-6 mx-auto mb-3 mb-md-0">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search movies..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                </div>
        </div>

    )
}