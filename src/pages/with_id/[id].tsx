import { useParams } from "react-router-dom"
import { backendData, getBackendData, html, meta } from "../../lib/october"

export const backend = backendData`
    return array(
        "name" => "kitty katta",
        "age" => 4
    );
`

export const metadata = meta`
`

export const header = html`
`

export default function Post() {
  const data = getBackendData<{name: string, age: number}>()
  const params = useParams()
  return <h1>Post:  {params.id} Cat Name: {data.name}</h1>
}