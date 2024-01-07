import React from 'react'
import { backendData, getBackendData, meta, html } from '../lib/october'
import { Link } from 'react-router-dom'

export const backend = backendData`
    return array(
        "name" => "John",
        "age" => 30,
        "city" => "New York"
    );
`

export const metadata = meta`
`

export const header = html`
`

export default function Post() {
    const data = getBackendData<{name: string, age: number, city: string}>()
    return <div className="flex items-center justify-center content-center">
        <div className="bold font-2xl">
            <h1>Name: {data.name}</h1>
            <span>Hi! Im {data.age} years old and im from {data.city} </span>
            <a href="with_id/23">check out my cat post</a>
        </div>
    </div>
}