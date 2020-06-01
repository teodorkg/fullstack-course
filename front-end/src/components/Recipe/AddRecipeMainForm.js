import React from "react";
import TextField from "@material-ui/core/TextField";

export default function AddRecipeMainForm({
  recipeToAdd,
  setRecipeToAdd,
  errors,
}) {
  function handleChange({ target }) {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setRecipeToAdd((recipeToAdd) => {
      return {
        ...recipeToAdd,
        [target.name]: value,
      };
    });
  }

  return (
    <>
      {recipeToAdd.id && (
        <>
          <TextField
            name="id"
            value={recipeToAdd.id}
            label="ID"
            variant="outlined"
            disabled
          />
          <TextField
            name="creatorId"
            value={recipeToAdd.creatorId}
            label="Creator ID"
            variant="outlined"
            disabled
          />
        </>
      )}
      <TextField
        name="title"
        value={recipeToAdd.title || ""}
        error={errors.title}
        label="title"
        helperText={
          errors.title && "the title doesn't comply with the rules or is taken"
        }
        variant="outlined"
        onChange={handleChange}
      />
      <TextField
        name="shortDescription"
        value={recipeToAdd.shortDescription || ""}
        label="shortDescription"
        error={errors.shortDescription}
        helperText={
          errors.shortDescription &&
          "the short description must be less than 256 chars"
        }
        variant="outlined"
        onChange={handleChange}
      />
      <TextField
        name="minutesNeeded"
        type="number"
        value={recipeToAdd.minutesNeeded || ""}
        label="Minutes Needed"
        error={errors.minutesNeeded}
        helperText={
          errors.minutesNeeded &&
          "the minutes needed doesn't comply with the rules"
        }
        variant="outlined"
        onChange={handleChange}
      />
      <TextField
        name="pictureSrc"
        value={recipeToAdd.pictureSrc || ""}
        label="Picture url"
        variant="outlined"
        onChange={handleChange}
        error={errors.pictureSrc}
        helperText={
          errors.pictureSrc && "the picture url must be less than 250 chars"
        }
      />
      <TextField
        name="description"
        value={recipeToAdd.description || ""}
        label="Description"
        variant="outlined"
        onChange={handleChange}
        multiline
        rows="7"
        error={errors.description}
        helperText={
          errors.description && "the descrption can be up to 2048 chars"
        }
      />
      <TextField
        name="tags"
        value={recipeToAdd.tags || ""}
        label="Tags"
        variant="outlined"
        onChange={handleChange}
        error={errors.tags}
        helperText={errors.tags && "the tag doesn't comply with the rules"}
      />
      {recipeToAdd.id && (
        <TextField
          value={recipeToAdd.timeLastMod}
          label="Date last modification"
          variant="outlined"
          disabled
        />
      )}
      {recipeToAdd.id && (
        <TextField
          value={recipeToAdd.timeCreated}
          label="Date created"
          variant="outlined"
          disabled
        />
      )}
    </>
  );
}
