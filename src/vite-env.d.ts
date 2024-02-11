/// <reference types="vite/client" />

import { Token } from "typescript"
import { readonly } from "vue"

interface ImportMetaEnv {
  readonly VITE_API_KEY: string
  readonly VITE_AUTH_DOMAIN: string
  readonly VITE_PROJECT_ID: string
  readonly VITE_STORAGE_BUCKET: string
  readonly VITE_MESSAGING_SENDER_ID: string
  readonly VITE_APP_ID: string
  readonly VITE_MEASUREMENT_ID: string
  // その他の環境変数...
  readonly VITE_CLIENT_ID: string
  readonly VITE_CLIENT_SECRET: string
  readonly VITE_CALLBACK: string
  readonly VITE_TOKEN: token
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

