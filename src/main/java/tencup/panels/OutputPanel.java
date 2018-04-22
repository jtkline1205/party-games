package tencup.panels;

import java.awt.Dimension;
import javax.swing.JPanel;
import javax.swing.JTextArea;

@SuppressWarnings("serial")
public class OutputPanel extends JPanel {
	private JTextArea outputArea;

	public OutputPanel()
	{				
		outputArea = new JTextArea();
		outputArea.setPreferredSize(new Dimension(800,300));
		outputArea.setLineWrap(true);
		outputArea.setEditable(false);
		add(outputArea);
	}

	public void outputText(String textToSet) 
	{
		outputArea.append(textToSet+"\n");
	}

	public void clearText() 
	{
		outputArea.setText("");
	}
}
