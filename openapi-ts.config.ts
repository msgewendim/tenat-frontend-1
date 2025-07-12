import { defineConfig } from '@hey-api/openapi-ts';
import {config} from 'dotenv';

config();
const BASE_API_URL = process.env.VITE_API_URL 


export default defineConfig({
  input: {
    path: `${BASE_API_URL}-json`,
  },
  parser: {
    patch: {

      meta: (meta: any) => {
        meta.title = 'Tenat API';
        meta.description = 'Tenat API';
        meta.version = '1.0.0';
        meta.contact = {
          name: 'Tenat',
          url: 'https://tenat.co.il',
        };
      },
      schemas: {
        
        'Product': (schema) => {
          schema.additionalProperties = false;
          schema.properties = {
            ...schema.properties,
            _id: {
              type: 'string',
            },
          };
        },
        'Package': (schema) => {
          schema.additionalProperties = false;
          schema.properties = {
            ...schema.properties,
            _id: {
              type: 'string',
            },
          };
        },
        'Recipe': (schema) => {
          schema.additionalProperties = false;
          schema.properties = {
            ...schema.properties,
            _id: {
              type: 'string',
            },
          };
        },
        'Feature': (schema) => {
          schema.additionalProperties = false;
          schema.properties = {
            ...schema.properties,
            _id: {
              type: 'string',
            },
          };
        },
      },
      // // Remove 'Dto' suffix from all schema keys and update $refs
      // // @ts-expect-error
      // root: spec => {
      //   const schemas = spec?.components?.schemas
      //   if (!schemas) return

      //   // 1. Build a map of oldName -> newName for all Dto schemas
      //   const renameMap: Record<string, string> = {}
      //   for (const name of Object.keys(schemas)) {
      //     if (name.endsWith('Dto')) {
      //       const newName = name.replace(/Dto$/, '')
      //       renameMap[name] = newName
      //     }
      //   }

      //   // 2. Rename the schema keys
      //   for (const [oldName, newName] of Object.entries(renameMap)) {
      //     schemas[newName] = schemas[oldName]
      //     delete schemas[oldName]
      //     // Also update the title for consistency
      //     if (schemas[newName] && typeof schemas[newName] === 'object' && 'title' in schemas[newName]) {
      //       schemas[newName].title = newName
      //     }
      //   }

      //   // 3. Recursively update all $ref values in the spec
      //   function updateRefs(obj) {
      //     if (Array.isArray(obj)) {
      //       obj.forEach(updateRefs)
      //     } else if (obj && typeof obj === 'object') {
      //       for (const key of Object.keys(obj)) {
      //         if (key === '$ref' && typeof obj[key] === 'string') {
      //           for (const [oldName, newName] of Object.entries(renameMap)) {
      //             obj[key] = obj[key].replace(
      //               `#/components/schemas/${oldName}`,
      //               `#/components/schemas/${newName}`
      //             )
      //           }
      //         } else {
      //           updateRefs(obj[key])
      //         }
      //       }
      //     }
      //   }
      //   updateRefs(spec)
      // },
    },
  },
  output: {
    indexFile: false,
    path: 'src/client',
  },
  plugins: [
    'zod',
    '@tanstack/react-query',
  ],  
});