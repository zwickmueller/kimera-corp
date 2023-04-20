// export default function (req, res, redirect) {
//   console.log(req);
//   const hasTrailingSlash = req.url.endsWith("/");
//   if (hasTrailingSlash && req.url.length > 1) {
//     const newUrl = req.url.slice(0, -1);
//     return res.redirect(301, newUrl);
//   }
//   return next();
// }

// export default function ({ route, redirect }) {
//   console.log(route);
//   //   if (route.path !== "/" && route.path.endsWith("/")) {
//   //     const newPath = route.path.slice(0, -1);
//   //     return redirect(301, newPath);
//   //   }
//   //   const path = route.fullPath;
//   //   if (path !== "/" && path.endsWith("/")) {
//   //     const newPath = path.slice(0, -1);
//   //     if (newPath !== path) {
//   //       return redirect(301, newPath);
//   //     }
//   //   }
//   const fullPath = route.fullPath;
//   if (fullPath !== "/" && fullPath.endsWith("/")) {
//     const newPath = fullPath.slice(0, -1);
//     if (newPath !== fullPath) {
//       const { query, hash } = route;
//       const nextRoute = { path: newPath, query, hash };
//       return redirect(301, nextRoute);
//     }
//   }
// }
