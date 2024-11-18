// (DeviceMotionEvent as any).requestPermission = () => {
//     return new Promise((resolve) => {
//         (window as any).grantMotionPermission = () => resolve('granted');
//         (window as any).denyMotionPermission = () => resolve('denied');
//     });
// }