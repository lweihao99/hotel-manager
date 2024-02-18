import { useQuery } from "react-query";
import axios from "../utils/request";

export const _GetAllRooms = () => {
  return useQuery({
    queryKey: ["allRooms"],
    queryFn: () => {
      axios({
        method: "GET",
        url: "api/rooms",
      }).then((res) => res.json());
    },
  });
};
