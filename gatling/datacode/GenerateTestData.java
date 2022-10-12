import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class GenerateTestData {
    public static void main(String[] args) throws IOException {
        generateGroceries();
        System.out.println("file created");
    }

    public static void generateGroceries() throws IOException {
        final int numOfLines = 1000;
        String[] types =
                {
                        "Canned / Jarred Goods",
                        "Dairy",
                        "Dry / Baking Goods",
                        "Frozen",
                        "Grains",
                        "Meat",
                        "Produce",
                        "Other"
                };
        
        // Open/Create the file.
        File file = new File("groceries.csv");
        FileWriter fw = new FileWriter(file);
        BufferedWriter bw = new BufferedWriter(fw);
        bw.write("item,type");
        bw.newLine();
        for (int i = 0; i < numOfLines; i++) {
            bw.write("item" + i + "," + types[i%8]);
            bw.newLine();
        }

        bw.close();
        fw.close();
    }
}
