const ScheduleCard = ({
  schedule,
  handleEdit,
  handleDelete,
})  => {
  return (
    <div className="border mt-6 rounded-xl p-4 bg-purple-50 shadow-sm">

      <div className="flex justify-between items-start flex-wrap gap-3">
        <h4 className="font-semibold text-gray-800">
          {schedule.content}
        </h4>

        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(schedule)}
            className="border px-3 py-1 rounded-lg text-sm hover:bg-blue-50"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(schedule.id)}
            className="border px-3 py-1 rounded-lg text-sm hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-sm mt-2 text-gray-600">
        {schedule.description}
      </p>

      <div className="mt-3 text-sm bg-white px-3 py-1 rounded border w-fit">
        {schedule.dateTime?.startDate} – {schedule.dateTime?.endDate}
        <br />
        {schedule.dateTime?.startTime} – {schedule.dateTime?.endTime}
        </div>

    </div>
  );
}


export default ScheduleCard;