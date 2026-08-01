import SummaryModal from "./SummaryModal";

interface Props {

  open:boolean;

  summary:string;

  loading:boolean;

  onClose:()=>void;

}

const SummaryViewer = (props:Props)=>{

  return <SummaryModal {...props}/>;

};

export default SummaryViewer;