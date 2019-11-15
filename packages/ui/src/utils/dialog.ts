export const dialog = (url: string, w = 600, h = 500) => {
  const y = window.top.outerHeight / 2 + window.top.screenY - h / 2;
  const x = window.top.outerWidth / 2 + window.top.screenX - w / 2;
  window.open(
    url,
    "Social Login",
    "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" +
      w +
      ", height=" +
      h +
      ", top=" +
      y +
      ", left=" +
      x
  );
};

export const facebookDialog = () => {
  dialog("auth/dialogs/facebook");
};

export const googleDialog = () => {
  dialog("auth/dialogs/google");
};

export const githubDialog = () => {
  dialog("auth/dialogs/github");
};
