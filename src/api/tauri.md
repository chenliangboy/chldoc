---
outline: deep
---

# Tauri 跨平台客户端

### js web展示
```js
// npm i @tauri-apps/api -s
import { invoke } from "@tauri-apps/api/tauri";
const msg = await invoke("say", { name: 'chenliang' });
console.log(msg);
// npm run tari dev
```

### rust 通讯
```rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn say(name: &str) -> String {
   String::from("你好".to_owned() + name)
}
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,say])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```