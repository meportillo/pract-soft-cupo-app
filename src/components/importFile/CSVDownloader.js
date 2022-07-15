import { useCSVDownloader } from 'react-papaparse';

export const CSVDownloader = (props) => {
  const { CSVDownloader, Type } = useCSVDownloader();

  return (
    <CSVDownloader
      type={Type.Button}
      filename={props.name}
      bom={true}
      config={{
        delimiter: ',',
      }}
      data={props.conflicts}
    >
      {props.nameButton}
    </CSVDownloader>
  );
}