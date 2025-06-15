import { Badge } from "@/components/ui/badge";

function HeartbeatStatus({ heartbeat, status }) {
  let className = "text-sm";

  if (heartbeat < 60) {
    status ||= "Bradycardia 🐢";
    className += " bg-red-500 text-white";
  } else if (heartbeat <= 100) {
    status ||= "Normal ✅";
    className += " bg-green-500 text-white";
  } else if (heartbeat <= 120) {
    status ||= "Mild Tachycardia ⚠️";
    className += " bg-orange-500 text-white";
  } else if (heartbeat <= 150) {
    status ||= "Moderate Tachycardia 🔥";
    className += " bg-yellow-400 text-black";
  } else {
    status ||= "Severe Tachycardia 🚨";
    className += " bg-red-500 text-white";
  }

  return <Badge className={className}>{status}</Badge>;
}

export default HeartbeatStatus;
