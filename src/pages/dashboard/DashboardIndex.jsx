import Linechartcomponent from './charts/LinechartComponent'
import Piechartcomponet from './charts/PiechartComponent'

function DashboardIndex() {
  return (
    <div className='grid xl:grid-cols-2 gap-4'>
      <Linechartcomponent />
      <Piechartcomponet />
    </div>
  )
}

export default DashboardIndex
