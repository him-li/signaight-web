"use client";

type AlertsProps = {
  count: number;
  showLabel: boolean;
};

export default function Alerts({ count: alertsCount, showLabel }: AlertsProps) {
  // const [alertsCount, setAlertsCount] = useState<number>(0);
  // const token = useAppSelector(selectAuthState).token;

  // const getPersonAlertsCount = useCallback(async () => {
  //   const data = await AlertsServices.getAlertsByPersonId(id!, token);
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const alertsCount = data.items.reduce((count: number, item: any) => {
  //     for (const key in item) {
  //       if (item[key] !== null && key !== "person" && key !== "_id") {
  //         count++;
  //       }
  //     }
  //     return count;
  //   }, 0);
  //   setAlertsCount(alertsCount);
  // }, [id, token]);

  // useEffect(() => {
  //   getPersonAlertsCount();
  // }, [getPersonAlertsCount]);
  return (
    <span>
      <span className={showLabel ? "" : "hidden"}>Alerts: </span>
      <span
        className={alertsCount > 0 ? "text-danger-500" : "text-default-500"}
      >
        {alertsCount ?? 0}
      </span>
    </span>
  );
}
