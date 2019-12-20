export const sendEmail = (emailAddress: string) => {
  const emailUrl = `mailto:${emailAddress}`;
  console.log("email:", emailUrl);

  chrome.tabs.create({ url: emailUrl }, tab =>
    setTimeout(function() {
      console.log("tab:", tab);

      if (tab?.id) {
        chrome.tabs.remove(tab.id);
      }
    }, 500)
  );
};
