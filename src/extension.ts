import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('pathescaper.copyEscapedPath', async () => {
        // Получаем текст из буфера обмена
        const clipboardText = await vscode.env.clipboard.readText();

        if (clipboardText) {
            // Экранируем только одиночные обратные слеши
            const escapedPath = clipboardText.replace(/\\(?!\\)/g, '\\\\');
            
            // Получаем активный редактор
            const editor = vscode.window.activeTextEditor;
            
            if (editor) {
                // Вставляем экранированный путь в текущую позицию курсора
                const position = editor.selection.active;
                editor.edit(editBuilder => {
                    editBuilder.insert(position, escapedPath);
                }).then(() => {
                    vscode.window.showInformationMessage('The escaped path is inserted into the file!');
                });
            }
        } else {
            vscode.window.showErrorMessage('The clipboard is empty or does not contain a path!');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
    // Функция для очистки, если нужно
    console.log('The extension has been deactivated!');
}