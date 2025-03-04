// public/split-worker.js
self.onmessage = function (e) {
  const {
    jsonInput,
    splitMethod,
    chunkSize: initialChunkSize,
    maxSizeValue,
    sizeUnit,
    targetPath,
  } = e.data;

  try {
    const parsedData = JSON.parse(jsonInput);
    let target = parsedData;

    const getNestedValue = (obj, path) => {
      const parts = path.split(".").filter((p) => p);
      let current = obj;
      for (const part of parts) {
        const arrayMatch = part.match(/(.+?)\[(\d+)\]/);
        if (arrayMatch) {
          const prop = arrayMatch[1];
          const index = parseInt(arrayMatch[2], 10);
          current = current[prop]?.[index];
        } else {
          current = current[part];
        }
        if (!current) break;
      }
      return current;
    };

    if (targetPath) {
      target = getNestedValue(parsedData, targetPath);
      if (typeof target !== "object" || target === null) {
        throw new Error(`Invalid target path: ${targetPath}`);
      }
    }

    let chunks = [];
    const reportProgress = (current, total) => {
      self.postMessage({ progress: Math.round((current / total) * 100) });
    };

    if (Array.isArray(target)) {
      const totalItems = target.length;

      if (splitMethod === "item") {
        for (let i = 0; i < totalItems; i += initialChunkSize) {
          chunks.push(target.slice(i, i + initialChunkSize));
          reportProgress(i + initialChunkSize, totalItems);
        }
      } else if (splitMethod === "chunkCount") {
        const itemsPerChunk = Math.ceil(totalItems / initialChunkSize);
        for (let i = 0; i < totalItems; i += itemsPerChunk) {
          chunks.push(target.slice(i, i + itemsPerChunk));
          reportProgress(i + itemsPerChunk, totalItems);
        }
      } else {
        const multiplier =
          sizeUnit === "KB" ? 1024 : sizeUnit === "MB" ? 1024 * 1024 : 1;
        const maxBytes = maxSizeValue * multiplier;
        let currentChunk = [];
        let currentSize = 0;

        for (let i = 0; i < target.length; i++) {
          const itemSize = new TextEncoder().encode(
            JSON.stringify(target[i])
          ).length;
          if (currentSize + itemSize > maxBytes && currentChunk.length > 0) {
            chunks.push(currentChunk);
            currentChunk = [];
            currentSize = 0;
          }
          currentChunk.push(target[i]);
          currentSize += itemSize;
          reportProgress(i + 1, target.length);
        }
        if (currentChunk.length > 0) chunks.push(currentChunk);
      }
    } else {
      const entries = Object.entries(target);
      const totalEntries = entries.length;

      if (splitMethod === "item") {
        for (let i = 0; i < totalEntries; i += initialChunkSize) {
          chunks.push(
            Object.fromEntries(entries.slice(i, i + initialChunkSize))
          );
          reportProgress(i + initialChunkSize, totalEntries);
        }
      } else if (splitMethod === "chunkCount") {
        const itemsPerChunk = Math.ceil(totalEntries / initialChunkSize);
        for (let i = 0; i < totalEntries; i += itemsPerChunk) {
          chunks.push(Object.fromEntries(entries.slice(i, i + itemsPerChunk)));
          reportProgress(i + itemsPerChunk, totalEntries);
        }
      } else {
        const multiplier =
          sizeUnit === "KB" ? 1024 : sizeUnit === "MB" ? 1024 * 1024 : 1;
        const maxBytes = maxSizeValue * multiplier;
        let currentChunk = [];
        let currentSize = 0;

        for (let i = 0; i < entries.length; i++) {
          const entrySize = new TextEncoder().encode(
            JSON.stringify({ [entries[i][0]]: entries[i][1] })
          ).length;
          if (currentSize + entrySize > maxBytes && currentChunk.length > 0) {
            chunks.push(Object.fromEntries(currentChunk));
            currentChunk = [];
            currentSize = 0;
          }
          currentChunk.push(entries[i]);
          currentSize += entrySize;
          reportProgress(i + 1, entries.length);
        }
        if (currentChunk.length > 0)
          chunks.push(Object.fromEntries(currentChunk));
      }
    }

    self.postMessage({ chunks });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
