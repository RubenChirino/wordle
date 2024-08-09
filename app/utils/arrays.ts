function createMatrix(rows: number, columns: number) {
    return Array.from({ length: rows }, () => Array.from({ length: columns }).fill(null)) as Array<Array<null>>;
}

export { createMatrix };