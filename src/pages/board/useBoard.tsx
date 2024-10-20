import { BoardList } from "@/interfaces/response/IBoard";
import { ITargetResponse } from "@/interfaces/response/ITarget";
import { apiService } from "@/service/axiosService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useBoard = () => {
  const { id } = useParams();

  const getTargets = async () => {
    const data = await apiService<ITargetResponse[]>({
      method: "GET",
      path: "target/list",
      Option: { params: { board: id } },
    });
    return data;
  };
  const { data: targets, isLoading: targetsIsLoading } = useQuery({
    queryKey: ["GET_TARGETS"],
    enabled: !!id,
    queryFn: getTargets,
  });

  const getBoardInfo = async () => {
    const data = await apiService<BoardList>({
      method: "GET",
      path: "board/info",
      Option: {
        params: {
          board: id,
        },
      },
    });
    return data;
  };
  const { data: boardInfo, isPending: boardInfoLoading } = useQuery({
    queryKey: ["get-board-info"],
    queryFn: getBoardInfo,
  });

  return { targets, targetsIsLoading, boardInfo, boardInfoLoading };
};

export default useBoard;
