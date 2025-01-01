import { ITargetResponse } from "@/interfaces/response/ITarget";
import { ITaskResponse } from "@/interfaces/response/ITask";
import { apiService } from "@/service/axiosService";
import { validateSchema } from "@/utils/common/joiValidator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import Joi from "joi";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const useTask = () => {
  const { id: targetId } = useParams();
  const queryClient = useQueryClient();
  const [editTask, setEditTask] = useState({ isEdit: false, id: "" });
  const [deleteTaskState, setDeleteState] = useState({ isOpen: false, id: "" });
  const schema = Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "عنوان نباید خالی باشد",
      "any.required": "عنوان الزامی است",
    }),
  });

  const taskFormik = useFormik({
    validate: (data) => validateSchema(schema, data),
    initialValues: {
      title: "",
    },
    onSubmit: (value) => {
      if (editTask.isEdit)
        updateTaskStatusMutation.mutate({
          taskId: editTask.id,
          title: value.title,
        });
      else createTaskMutation.mutate(value);
    },
    onReset: () => {
      setEditTask({ isEdit: false, id: "" });
    },
  });

  const getTasks = async () => {
    const data = await apiService<ITaskResponse[]>({
      method: "GET",
      path: `task/list`,
      Option: { params: { target: targetId } },
    });
    return data;
  };
  const { data: getTasksQuery, isLoading: getTasksQueryIsLoading } = useQuery({
    queryFn: getTasks,
    queryKey: ["get_tasks"],
  });

  const createTask = async (body: any) => {
    const data = await apiService({
      method: "POST",
      path: `task/create/${targetId}`,
      Option: { data: body },
    });
    return data;
  };
  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      toast.success(data.massage);
      queryClient.fetchQuery({
        queryKey: ["get_tasks"],
      });
      queryClient.refetchQueries({
        queryKey: ["get_target_info"],
      });
      taskFormik.resetForm();
    },
  });

  const changeTaskStatus = async (checked: {
    checked: boolean;
    taskId?: string;
  }) => {
    const data = await apiService({
      method: "PUT",
      path: `/task/update/${checked.taskId}`,
      Option: { data: { checked: checked.checked } },
    });
    return data;
  };
  const changeTaskStatusMutation = useMutation({
    mutationFn: changeTaskStatus,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["get_tasks"],
      });
      queryClient.refetchQueries({
        queryKey: ["get_target_info"],
      });
    },
  });

  const updateTaskStatus = async (body: { title: string; taskId?: string }) => {
    const data = await apiService({
      method: "PUT",
      path: `/task/update/${body.taskId}`,
      Option: { data: { title: body.title } },
    });
    return data;
  };
  const updateTaskStatusMutation = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      setEditTask({ isEdit: false, id: "" });
      taskFormik.resetForm();
      queryClient.refetchQueries({
        queryKey: ["get_tasks"],
      });
      queryClient.refetchQueries({
        queryKey: ["get_target_info"],
      });
    },
  });

  const getTargetInfoService = async () => {
    const data = await apiService<ITargetResponse>({
      method: "GET",
      path: `target/info/${targetId}`,
    });
    return data;
  };
  const { data: getTargetInfo, isFetching: getTargetInfoIsPending } = useQuery({
    queryKey: ["get_target_info"],
    queryFn: getTargetInfoService,
  });

  const deleteTaskService = async (taskId: string) => {
    const data = await apiService({
      method: "delete",
      path: `task/delete/${taskId}`,
    });
    return data;
  };
  const deleteTaskServiceMutation = useMutation({
    mutationFn: deleteTaskService,
    mutationKey: ["delete-task-mutation"],
    onSuccess: () => {
      setDeleteState({ id: "", isOpen: false });
      taskFormik.resetForm();
      queryClient.refetchQueries({
        queryKey: ["get_tasks"],
      });
      queryClient.refetchQueries({
        queryKey: ["get_target_info"],
      });
    },
  });

  return {
    taskFormik,
    createTaskMutation,
    queryClient,
    getTasksQuery,
    getTasksQueryIsLoading,
    changeTaskStatus,
    changeTaskStatusMutation,
    getTargetInfo,
    getTargetInfoIsPending,
    editTask,
    setEditTask,
    updateTaskStatusMutation,
    deleteTaskState,
    setDeleteState,
    deleteTaskService,
    deleteTaskServiceMutation,
  };
};

export default useTask;
