import cookie from "js-cookie";
import Router from "next/router";

export function handleLogIn(auth) {
  cookie.set("auth", auth);
  Router.push("/account");
}

export function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}
