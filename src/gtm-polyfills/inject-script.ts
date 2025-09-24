module.exports = function injectScript(
  url: string, 
  onSuccess?: () => void, 
  onFailure?: () => void
): void {
  if (typeof document !== "undefined") {
    const script = document.createElement("script");
    script.src = url;
    script.onload = () => onSuccess && onSuccess();
    script.onerror = () => onFailure && onFailure();
    document.head.appendChild(script);
  } else {
    console.warn("injectScript called outside browser:", url);
    if (onFailure) onFailure();
  }
}
