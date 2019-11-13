// const htmlFromSelection = () => {
//
//     if ( window.getSelection !== undefined ) {
//
//         const selection = window.getSelection();
//
//         if ( selection.rangeCount > 0 ) {
//
//             const clonedSelection = selection.getRangeAt( 0 ).cloneContents();
//             const div = document.createElement( 'div' );
//             div.appendChild( clonedSelection );
//             return div.innerHTML;
//
//         }
//
//     }
//
//     return '';
//
// }
//
// const encodeHTMLEntities = ( text ) => {
//
//     var textArea = document.createElement( 'textarea' );
//     textArea.innerText = text;
//     return textArea.innerHTML;
//
// }
//
// const decodeHTMLEntities = ( text ) => {
//
//     var textArea = document.createElement( 'textarea' );
//     textArea.innerHTML = text;
//     return textArea.value;
//
// }
//
// const fileToBase64 = ( file ) => {
//
//     // Check for the various File API support.
//     if ( window.File && window.FileReader && window.FileList && window.Blob ) {
//
//         // Great success! All the File APIs are supported.
//         return new Promise ( ( resolve, reject ) => {
//
//             /**
//              * The FileReader object lets web applications asynchronously
//              * read the contents of files (or raw data buffers) stored on
//              * the user's computer, using File or Blob objects to specify
//              * the file or data to read.
//              *
//              * SEE: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
//              */
//             let _reader = new FileReader();
//
//             /**
//              * Represents the file's data as
//              * a base64 encoded string.
//              *
//              * SEE: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
//              */
//             _reader.readAsDataURL( file );
//
//             /**
//              * A handler for the load event. This event is triggered each
//              * time the reading operation is successfully completed.
//              *
//              * SEE: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload
//              */
//             _reader.onload = () => {
//
//                 resolve( _reader.result );
//
//             };
//
//             /**
//              * A handler for the error event. This event is triggered
//              * each time the reading operation encounter an error.
//              *
//              * SEE: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onerror
//              */
//             _reader.onerror = () => {
//
//                 console.error( _reader.error );
//                 reject( _reader.error );
//
//             };
//
//         } );
//
//     } else {
//
//         console.warn( 'The File APIs are not fully supported in this browser.' );
//         return;
//
//     }
//
// };
//
// export { htmlFromSelection, encodeHTMLEntities, decodeHTMLEntities, fileToBase64 };
