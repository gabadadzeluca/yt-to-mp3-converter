export default function DownloadLink(props:{
  downloadLink: string|undefined;
}){
  const downloadLink = props.downloadLink;
  return(
    <div>
      <a href={downloadLink}>Download mp3</a>
    </div>
  );
}