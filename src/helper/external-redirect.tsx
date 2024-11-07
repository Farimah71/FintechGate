const ExternalRedirect = ({ externalURL }: { externalURL: string }) => {
  window.location.replace(externalURL);

  return <></>;
};
export default ExternalRedirect;
