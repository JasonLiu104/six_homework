## six_homework
https://hackmd.io/wxEJSh6DTFS_SMnd62KSYw?view
# 紀錄
- @types/express : 定義 Express 框架的類型，可以提供編譯時期的類型檢查。
- @types/node : 定義 Node.js 的類型，可以提供編譯時期的類型檢查。
- nodemon : 監聽檔案變化，當有檔案變化時會自動重新啟動 Node.js 應用。
- ts-node : 直接執行 TypeScript 檔案，而不需要先編譯成 JavaScript。
- 設定 tsconfig
```
    "compilerOptions": { 
        "module": "commonjs", // 模組系統，這裡設置為 commonjs，表示使用 CommonJS 模組系統。
        "esModuleInterop": true, //  啟用此選項後，可以從沒有預設匯出的模組進行默認匯入，通過這個設置，可以解決在使用一些庫時，無法直接使用 import 匯入的問題。
        "target": "es6", // 編譯出來的程式碼遵循的 ECMAScript 版本，這裡設置為 es6，表示編譯出來的程式碼遵循 ECMAScript 6 版本的語法。
        "rootDir": "./", // Root directory of input files
        "outDir": "./build", // Output directory of compiled files
        "strict": true // 啟用所有嚴格的類型檢查選項，這些檢查可以幫助開發人員找出潛在的錯誤。
    }
```
