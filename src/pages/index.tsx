import React from 'react'
import { backendData, getBackendData, meta } from '../lib/october'

export const backend = backendData`
    array(
        "name" => "John",
        "age" => 30,
        "city" => "New York"
    );
`

export const metadata = meta`
    layout = "default"
`

export default function Post() {
    // const data = getBackendData<{name: string, age: number, city: string}>()
    return <h1>Post ss</h1>
}