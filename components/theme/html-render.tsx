const HtmlRender = ({ htmlContent }: { htmlContent: string }) => {
  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
export default HtmlRender;