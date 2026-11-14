/**
 * Newsletter signup.
 *
 * NEWSLETTER_ENDPOINT is the only switch for the signup form.
 * Leave it as an empty string until a free MailerLite or Buttondown
 * account exists. While it is empty, each signup box shows
 * "Email me to join the list" and does not submit the form.
 * Do not point the form action at a mailto: link.
 *
 * To turn it on:
 * 1. Paste the provider's form action URL below. It must start with https://.
 *    Buttondown embed example:
 *      https://buttondown.com/api/emails/embed-subscribe/YOURNAME
 *      Buttondown expects the email input to be named "email".
 *    MailerLite embed example: use the action URL from MailerLite's HTML form.
 *      MailerLite often expects fields[email] and fields[name]. If so, change
 *      the input name attributes in the signup forms to match.
 * 2. The two forms (prolon-longevity.html and the fasting article) post
 *    name and email with those field names. Rename the inputs if the
 *    provider requires different names. This file does not need a second copy
 *    of the URL.
 */
var NEWSLETTER_ENDPOINT = "";

(function () {
  var endpoint = typeof NEWSLETTER_ENDPOINT === "string" ? NEWSLETTER_ENDPOINT.trim() : "";
  var ready = /^https:\/\/\S+$/.test(endpoint);
  var boxes = document.querySelectorAll("[data-newsletter]");
  for (var i = 0; i < boxes.length; i++) {
    var box = boxes[i];
    var form = box.querySelector("form");
    var fallback = box.querySelector(".newsletter-fallback");
    if (!ready || !form) {
      if (form) form.hidden = true;
      if (fallback) fallback.hidden = false;
      continue;
    }
    form.action = endpoint;
    form.hidden = false;
    if (fallback) fallback.hidden = true;
  }
})();