/**
 * Copyright (C) 2024 - Present Vasile Câmpeanu. All rights reserved.
 *
 * This document and its contents are proprietary to Vasile Câmpeanu. Unauthorized copying, distribution,
 * or utilization of this document, in part or in whole, via any medium is strictly prohibited.
 */

// import { createElement } from 'react';
// import { createRoot, Root } from 'react-dom/client';
// import { PluginRoot } from './HelloWorld.tsx';

// export default class HelloWorld extends Plugin {
//     private root: Root | null = null;
//     private rootContainerId: string = 'helloworld-root';

//     onload(): void {
//         // Logging
//         console.log('Plugin loaded with succes!');

//         // Creating a container
//         const container = document.getElementById('workspace') as HTMLElement;

//         // Create a new div and append it to the container
//         const rootDiv = document.createElement('div');
//         rootDiv.id = this.rootContainerId;
//         container.appendChild(rootDiv);

//         // Create the root with the new div
//         this.root = createRoot(rootDiv);

//         // Use the new root to render
//         this.root.render(
//             createElement(PluginRoot, {})
//         );
//     }

//     onunload(): void {
//         if (this.root) {
//             this.root.unmount();
//         }

//         // Remove the created div
//         const rootDiv = document.getElementById(this.rootContainerId);

//         if (rootDiv && rootDiv.parentNode) {
//             rootDiv.parentNode.removeChild(rootDiv);
//         }
//     }
// }
