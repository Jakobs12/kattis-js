import java.util.Scanner;
import java.util.Arrays;

class Main {
    static int move = -1;

    public static void main(String[] args) {
        
        int[][] matrix = setup();
        matrix = swapMatrix(matrix);

        matrix = calcNewMatrix(matrix);
        matrix = moveMatrix(matrix);

        matrix = swapMatrixback(matrix);
        printResult(matrix);
    }

    static int[][] swapMatrix(int[][] matrix) {
        switch(move) {
            case 2:
                return inverseMatrix(matrix);
            case 1:
                return transpose(matrix);
            case 3:
                return inverseMatrix(transpose(matrix));
        }
        return matrix;
    }

    static int [][] swapMatrixback(int[][] matrix) {
        switch(move) {
            case 2:
                return inverseMatrix(matrix);
            case 1:
                return transpose(matrix);
            case 3:
                return transpose(inverseMatrix(matrix));
        }
        return matrix;
    }

    static int[][] moveMatrix(int[][] matrix) {
        for(int i = 0; i < matrix.length; i++) {
            for(int j = 0; j < matrix[i].length; j++) {
                moveSingleRow(i, j, matrix);
            }
        }
        return matrix;
    }

    static int[][] calcNewMatrix(int[][] matrix) {
        // Different cases

        // Update matrix
        for(int i = 0; i < matrix.length; i++) {
            for(int j = 0; j < matrix[i].length; j++) {
                calcSingleRow(i, j, matrix);
            }
        }
        return matrix;
    }

    static int[][] transpose(int[][] matrix) {
        int[][] tmp = deepCopy(matrix);

        for(int i = 0; i < tmp.length; i++) {
            for(int j = 0; j < tmp[i].length; j++) {
                tmp[i][j] = matrix[j][i];
            }
        }
        return tmp;
    }

    static int[][] inverseMatrix(int[][] matrix) {
        int[][] tmp = deepCopy(matrix);

        for(int i = 0; i < tmp.length; i++) {
            int jInverseCounter = tmp[i].length-1;
            for(int j = 0; j < tmp[i].length; j++) {
                tmp[i][j] = matrix[i][jInverseCounter];
                jInverseCounter--;
            }
        }
        return tmp;
    }

    static void moveSingleRow(int i, int j, int[][] matrix) {
        int nextIndex = j+1;
        for(int k = nextIndex; k < 4; k++) {
            int cur = matrix[i][j];
            int next = matrix[i][k];

            if(cur == 0 && next != 0) {
                matrix[i][j] = matrix[i][k];
                matrix[i][k] = 0;
            }
        }
    }

    static void calcSingleRow(int i, int j, int[][] matrix) {
        int nextIndex = j+1;
        for(int k = nextIndex; k < 4; k++) {
            int cur = matrix[i][j];
            int next = matrix[i][k];

            if(next != cur && next != 0) {
                return;
            }
            if(next == cur) {
                matrix[i][j] = cur*2;
                matrix[i][k] = 0;
                return;
            }
        }
    }

    static void printResult(int[][] matrix) {
        for(int i = 0; i < 4; i++) {
            for(int j = 0; j < 4; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println("");
        }
    }
    static int[][] setup() {
        Scanner sc = new Scanner(System.in);
        String input = "";
        int counter = 0;

        int[][] matrix = new int[4][4];

        while(sc.hasNext()) {
            input = sc.nextLine();
            if(counter == 4) {
                move = Integer.parseInt(input);
                return matrix;
            }

            int[] intArr = Arrays.asList(input.split(" ")).stream().mapToInt(Integer::parseInt).toArray();
            matrix[counter] = intArr;

            

            counter++;

        }
        return matrix;
    }

    public static int[][] deepCopy(int[][] original) {
        if (original == null) {
            return null;
        }
    
        final int[][] result = new int[original.length][];
        for (int i = 0; i < original.length; i++) {
            result[i] = Arrays.copyOf(original[i], original[i].length);
            // For Java versions prior to Java 6 use the next:
            // System.arraycopy(original[i], 0, result[i], 0, original[i].length);
        }
        return result;
    }
}