const routesMap = {
  "post:create": "/posts/new",
  "post:read": "/posts/:slug",
  "post:edit": "/posts/:slug/edit",
};

export function getInternalHref(
  resource: "post",
  action: "create" | "read" | "edit",
  params?: { slug?: string },
  query?: Record<string, string | number | boolean>
) {
  let href = routesMap[`${resource}:${action}`];

  if (params?.slug) {
    href = href.replace(":slug", params.slug);
  }

  if (query) {
    const qs = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) =>
      qs.append(key, String(value))
    );
    href += `?${qs.toString()}`;
  }

  return href;
}

/*
Example usage:

getInternalHref("post", "create"); 
"/posts/new"

getInternalHref("post", "read", { slug: "my-post" }); 
"/posts/my-post"

getInternalHref("post", "edit", { slug: "my-post" }, { from: "admin" }); 
"/posts/my-post/edit?from=admin"
*/
