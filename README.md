# Reactober

Reactober is a project that simplifies the integration of React into October CMS projects, allowing developers to build React applications within the context of an October CMS backend. This project includes a file-based router for React, pre-installed Tailwind CSS with Webpack for efficient bundling, and code-splitting capabilities to reduce bundle sizes.

## Features

- Seamless integration of React into October CMS projects.
- File-based router for React applications.
- Tailwind CSS pre-installed with Webpack for efficient bundling.
- Code-splitting capabilities to reduce bundle sizes.

## Scripts

The project includes three main scripts in the `package.json` file:

1. **Serve:**
   - Script: `webpack serve`
   - Description: Enables the development of React components without backend code. It builds the UI with hot reloading for an efficient development workflow.

2. **Watch:**
   - Script: `ts-node src/generator/watch.ts`
   - Description: Performs real-time conversion from frontend source code to the output October CMS template. This script facilitates a seamless transition from React development to October CMS integration.

3. **Build:**
   - Script: `ts-node src/generator/index.ts`
   - Description: Builds the theme template, incorporating both backend and frontend code. It also generates bundles optimized for October CMS deployment.

## Usage

1. **Development Mode:**

   ```bash
   npm run serve
   ```

   - Run this command to start the development server for React components. It enables hot reloading for an efficient development experience.

2. **Real-time Conversion:**

   ```bash
   npm run watch
   ```

   - Execute this command to perform real-time conversion from frontend source code to the output October CMS template. It helps in syncing the React development with the October CMS theme.

3. **Build Theme:**

   ```bash
   npm run build
   ```

   - Use this command to build the theme template, incorporating both backend and frontend code. The resulting bundles are optimized for deployment on October CMS.

## Reactober Project Structure

The Reactober project has the following directory structure:

- **`/`**
  - **`hosting/`**
    - `index.html`: HTML file for hosting purposes.
  - **`src/`**
    - **`generator/`**
      - **`assets/`**
        - `dirStructure.yaml`: YAML file describing the project directory structure.
        - **`files/`**
          - `theme.yaml`: YAML file for defining October CMS theme configurations.
        - `template.html`: HTML template for October CMS.
      - `index.ts`: Main generator script for building October CMS theme.
      - `utils.ts`: Utility functions for the generator.
      - `watch.ts`: Real-time conversion script for frontend source code to the October CMS template.
    - **`lib/`**
      - `october.ts`: Frontend helper functions for interacting with October CMS.
    - `main.tsx`: Main entry point for the React application.
    - **`pages/`**
      - `404.tsx`: Custom 404 page component.
      - `_app.tsx`: App component wrapper for all pages.
      - `index.tsx`: Main index page component.
      - **`with_id/`**
        - `[id].tsx`: Dynamic route component with a parameter in the URL.
    - `routes.tsx`: File-based router for React.
    - **`style/`**
      - `global.css`: Global CSS styles.
  - `tailwind.config.js`: Tailwind CSS configuration file.
  - **`theme_export/`**
    - **`assets/`**
      - **`css/`**: Exported CSS files.
      - **`images/`**: Exported image assets.
      - **`js/`**: Exported JavaScript bundles.
    - **`pages/`**
      - `index.htm`: Exported October CMS index page.
      - **`with_id/`**
        - `PATHPARAM__id__.htm`: Exported October CMS page for dynamic routes.
    - `theme.yaml`: Exported October CMS theme configuration.
  - `tsconfig.json`: TypeScript configuration file.
  - `webpack.config.js`: Webpack configuration file.
  - `yarn.lock`: Yarn package manager lock file.

## Folders Description

- **`hosting/`**: Contains hosting-related files, such as the main HTML file for deployment.

- **`src/generator/`**: Generator scripts for building the October CMS theme.

  - **`assets/`**: Contains YAML and HTML files defining the project directory structure and October CMS theme configurations.

  - `index.ts`: Main script for generating the October CMS theme.

  - `utils.ts`: Utility functions used by the generator.

  - `watch.ts`: Real-time conversion script for frontend source code to the October CMS template.

- **`src/lib/`**: Frontend helper functions for interacting with October CMS.

- **`src/pages/`**: File-based router for React components.

  - **`with_id/`**: Dynamic route components with parameters in the URL.

- **`src/style/`**: Contains global CSS styles.

- **`theme_export/`**: Contains the exported October CMS theme.

  - **`assets/`**: Exported CSS, image, and JavaScript files.

  - **`pages/`**: Exported October CMS pages.

## Sample Code

```typescript
// src/pages/index.tsx

import React from 'react';
import { backendData, getBackendData, meta, html } from '../lib/october';

export const backend = backendData`
    return array(
        "name" => "John",
        "age" => 30,
        "city" => "New York"
    );
`;

export const metadata = meta`
`;

export const header = html`
`;

export default function Post() {
    const data = getBackendData<{ name: string; age: number; city: string }>();
    return (
        <div className="flex items-center justify-center content-center">
            <div className="bold font-2xl">
                <h1>Name: {data.name}</h1>
                <span>Hi! I'm {data.age} years old, and I'm from {data.city}</span>
                chipi chapa
                <a href="/with_id/23">Check out my cat post</a>
            </div>
        </div>
    );
}
```

Feel free to adapt this structure to fit your project's specific needs.

## Dependencies

- React (v18.2.0)
- React DOM (v18.2.0)
- React Router DOM (v6.21.1)
- Tailwind CSS (v3.4.0)
- Webpack (v5.89.0)

For a complete list of dependencies, refer to the `package.json` file.

## License

This project is licensed under the MIT License.

## Notes

Make sure to check for updates to the dependencies regularly and update your project accordingly for security and compatibility reasons.
