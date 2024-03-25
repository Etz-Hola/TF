import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Banner } from "@/components/ui/banner";
import { Actions } from "./components/Actions";
import { SectionForm } from "./components/SectionForm"; // Assuming SectionForm is the form component for train sections
import { useAxiosInstance } from "../../../../../api/axios";
import useShowToast from "../../../../../../hooks/useShowToast";

const SectionList = ({ sections, onEdit, onReorder }) => {
  // Assume you have SectionList component implemented
  return (
    <div>
      {/* Implement your SectionList component here */}
    </div>
  );
};

const SectionForm = ({ setTrain, initialData, trainId }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const showToast = useShowToast();
  const axiosInstance = useAxiosInstance();

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const onSubmit = async (values) => {
    try {
      await axiosInstance.put(`/trains/edit-train/${trainId}/create-section`, values);
      showToast('Success', 'Section created', 'success');
      toggleCreating();
      // Assuming you need to update the train data after creating a section
      // Adjust this part according to your application logic
      // setTrain((prev) => ({ ...prev, title: values.title }));
    } catch(error) {
      if (error) {
        showToast(
          "Error",
          error.response.data.message || error.response.data.error,
          "error"
        );
      }
    }
  };

  const onReorder = async (updateData) => {
    try {
      setIsUpdating(true);
      await axiosInstance.put(`/trains/edit-train/${trainId}/reorder-sections`, {
          list: updateData
      });
      showToast('Success', 'Sections reordered', 'success');
    } catch(error) {
      if (error) {
        showToast(
          "Error",
          error.response.data.message || error.response.data.error,
          "error"
        );
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id) => {
    navigate(`/clients/edit-train/${trainId}/section/${id}`);
  };

  return (
    <div className="relative mt-6 border shadow-md border-solid border-1 border-blue-300 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Section
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a section
            </>
          )}
        </Button>
      </div>
      
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the journey'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button colorScheme="blue" disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
          
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.sections && "text-slate-500 italic"
          )}
        >
          {!initialData.sections && "No sections"}
          <SectionList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.sections || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the sections
        </p>
      )}
    </div>
  );
};
